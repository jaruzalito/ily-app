import { createClient } from '@supabase/supabase-js'
import { ref } from 'vue'

// Inicjalizacja klienta Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('⚠️ Brakuje zmiennych środowiskowych Supabase! Sprawdź plik .env')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Composable do zarządzania zdjęciami
export function usePhotos() {
    const photos = ref([])
    const loading = ref(false)
    const error = ref(null)

    // Pobierz wszystkie zdjęcia z bazy
    const fetchPhotos = async () => {
        try {
            loading.value = true
            error.value = null

            const { data, error: fetchError } = await supabase
                .from('photos')
                .select('*')
                .order('created_at', { ascending: true })

            if (fetchError) throw fetchError

            // Konwertuj format bazy danych na format używany przez komponent
            photos.value = data.map(photo => photo.image_data)

            console.log('✅ Załadowano zdjęcia:', photos.value.length)
        } catch (err) {
            console.error('❌ Błąd podczas pobierania zdjęć:', err)
            error.value = err.message
        } finally {
            loading.value = false
        }
    }

    // Dodaj nowe zdjęcie
    const addPhoto = async (imageData) => {
        try {
            loading.value = true
            error.value = null

            const { data, error: insertError } = await supabase
                .from('photos')
                .insert([
                    {
                        image_data: imageData,
                        created_at: new Date().toISOString()
                    }
                ])
                .select()

            if (insertError) throw insertError

            console.log('✅ Dodano zdjęcie')

            // Dodaj lokalnie natychmiast (bez czekania na realtime)
            photos.value.push(imageData)

            return data
        } catch (err) {
            console.error('❌ Błąd podczas dodawania zdjęcia:', err)
            error.value = err.message
            throw err
        } finally {
            loading.value = false
        }
    }

    // Usuń zdjęcie
    const deletePhoto = async (imageData) => {
        try {
            loading.value = true
            error.value = null

            // Znajdź zdjęcie po image_data (base64)
            const { error: deleteError } = await supabase
                .from('photos')
                .delete()
                .eq('image_data', imageData)

            if (deleteError) throw deleteError

            console.log('✅ Usunięto zdjęcie')

            // Usuń lokalnie natychmiast
            const index = photos.value.indexOf(imageData)
            if (index > -1) {
                photos.value.splice(index, 1)
            }
        } catch (err) {
            console.error('❌ Błąd podczas usuwania zdjęcia:', err)
            error.value = err.message
            throw err
        } finally {
            loading.value = false
        }
    }

    // Subskrypcja do zmian w czasie rzeczywistym
    const subscribeToPhotos = (callback) => {
        console.log('🔄 Włączam Realtime dla zdjęć...')

        const channel = supabase
            .channel('photos-changes')
            .on(
                'postgres_changes',
                {
                    event: '*', // Nasłuchuj INSERT, UPDATE, DELETE
                    schema: 'public',
                    table: 'photos'
                },
                (payload) => {
                    console.log('📸 Realtime event:', payload.eventType)

                    if (payload.eventType === 'INSERT') {
                        // Dodaj nowe zdjęcie jeśli jeszcze go nie ma
                        const newImageData = payload.new.image_data
                        if (!photos.value.includes(newImageData)) {
                            photos.value.push(newImageData)
                            console.log('✅ Dodano nowe zdjęcie przez Realtime')
                        }
                    } else if (payload.eventType === 'DELETE') {
                        // Usuń zdjęcie
                        const deletedImageData = payload.old.image_data
                        const index = photos.value.indexOf(deletedImageData)
                        if (index > -1) {
                            photos.value.splice(index, 1)
                            console.log('✅ Usunięto zdjęcie przez Realtime')
                        }
                    }

                    // Wywołaj callback jeśli podany
                    if (callback) callback(payload)
                }
            )
            .subscribe((status) => {
                console.log('📡 Status Realtime (photos):', status)
            })

        // Zwróć funkcję do odsubskrybowania
        return () => {
            console.log('🔌 Odłączam Realtime dla zdjęć')
            supabase.removeChannel(channel)
        }
    }

    return {
        photos,
        loading,
        error,
        fetchPhotos,
        addPhoto,
        deletePhoto,
        subscribeToPhotos
    }
}

// Composable do zarządzania bucket list
export function useBucketList() {
    const bucketItems = ref([])
    const loading = ref(false)
    const error = ref(null)

    // Pobierz wszystkie elementy bucket list
    const fetchBucketItems = async () => {
        try {
            loading.value = true
            error.value = null

            const { data, error: fetchError } = await supabase
                .from('bucket_items')
                .select('*')
                .order('created_at', { ascending: true })

            if (fetchError) throw fetchError

            bucketItems.value = data
            console.log('✅ Załadowano bucket items:', bucketItems.value.length)
        } catch (err) {
            console.error('❌ Błąd podczas pobierania bucket items:', err)
            error.value = err.message
        } finally {
            loading.value = false
        }
    }

    // Dodaj nowy element
    const addBucketItem = async (item) => {
        try {
            loading.value = true
            error.value = null

            const { data, error: insertError } = await supabase
                .from('bucket_items')
                .insert([item])
                .select()

            if (insertError) throw insertError

            console.log('✅ Dodano bucket item')

            // Dodaj lokalnie natychmiast
            bucketItems.value.push(data[0])

            return data[0]
        } catch (err) {
            console.error('❌ Błąd podczas dodawania bucket item:', err)
            error.value = err.message
            throw err
        } finally {
            loading.value = false
        }
    }

    // Zaktualizuj element (np. zmień completed)
    const updateBucketItem = async (id, updates) => {
        try {
            loading.value = true
            error.value = null

            const { data, error: updateError } = await supabase
                .from('bucket_items')
                .update(updates)
                .eq('id', id)
                .select()

            if (updateError) throw updateError

            console.log('✅ Zaktualizowano bucket item')

            // Zaktualizuj lokalnie natychmiast
            const index = bucketItems.value.findIndex(item => item.id === id)
            if (index > -1) {
                bucketItems.value[index] = { ...bucketItems.value[index], ...updates }
            }

            return data[0]
        } catch (err) {
            console.error('❌ Błąd podczas aktualizacji bucket item:', err)
            error.value = err.message
            throw err
        } finally {
            loading.value = false
        }
    }

    // Usuń element
    const deleteBucketItem = async (id) => {
        try {
            loading.value = true
            error.value = null

            const { error: deleteError } = await supabase
                .from('bucket_items')
                .delete()
                .eq('id', id)

            if (deleteError) throw deleteError

            console.log('✅ Usunięto bucket item')

            // Usuń lokalnie natychmiast
            bucketItems.value = bucketItems.value.filter(item => item.id !== id)
        } catch (err) {
            console.error('❌ Błąd podczas usuwania bucket item:', err)
            error.value = err.message
            throw err
        } finally {
            loading.value = false
        }
    }

    // Subskrypcja do zmian w czasie rzeczywistym
    const subscribeToBucketList = (callback) => {
        console.log('🔄 Włączam Realtime dla bucket list...')

        const channel = supabase
            .channel('bucket-changes')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'bucket_items'
                },
                (payload) => {
                    console.log('📝 Realtime event:', payload.eventType)

                    if (payload.eventType === 'INSERT') {
                        // Dodaj nowy element jeśli jeszcze go nie ma
                        if (!bucketItems.value.find(item => item.id === payload.new.id)) {
                            bucketItems.value.push(payload.new)
                            console.log('✅ Dodano nowy bucket item przez Realtime')
                        }
                    } else if (payload.eventType === 'UPDATE') {
                        // Zaktualizuj element
                        const index = bucketItems.value.findIndex(item => item.id === payload.new.id)
                        if (index > -1) {
                            bucketItems.value[index] = payload.new
                            console.log('✅ Zaktualizowano bucket item przez Realtime')
                        }
                    } else if (payload.eventType === 'DELETE') {
                        // Usuń element
                        bucketItems.value = bucketItems.value.filter(item => item.id !== payload.old.id)
                        console.log('✅ Usunięto bucket item przez Realtime')
                    }

                    // Wywołaj callback jeśli podany
                    if (callback) callback(payload)
                }
            )
            .subscribe((status) => {
                console.log('📡 Status Realtime (bucket list):', status)
            })

        // Zwróć funkcję do odsubskrybowania
        return () => {
            console.log('🔌 Odłączam Realtime dla bucket list')
            supabase.removeChannel(channel)
        }
    }

    return {
        bucketItems,
        loading,
        error,
        fetchBucketItems,
        addBucketItem,
        updateBucketItem,
        deleteBucketItem,
        subscribeToBucketList
    }
}