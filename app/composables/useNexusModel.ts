export const useNexusModel = () => {
  const config = useRuntimeConfig()
  
  // Safe Fallback: clean URL string
  const rawApiBase = config.public.apiBase || '[https://cpe-2lfo.onrender.com](https://cpe-2lfo.onrender.com)'
  // Remove markdown artifacts if present
  const apiBase = rawApiBase.replace(/\[|\]|\(.*\)/g, '')

  const fetchProjections = async (
    id: string,
    inputs: Ref<{ crops: number; renewables: number; waterEff: number }>
  ) => {
    
    const payload = computed(() => ({
      name: "Frontend Simulation",
      description: "Live interactive projection",
      parameters: {
        food_production_intensity: inputs.value.crops / 100,
        renewable_energy_share: inputs.value.renewables / 100,
        water_conservation_level: inputs.value.waterEff / 100,
        population_growth: 1.01 
      }
    }))

    // FIX: Added trailing slash to /api/scenarios/ to prevent 308 redirects causing CORS errors
    const { data, error, pending, refresh } = await useFetch(`${apiBase}/api/scenarios/`, {
      key: id,
      method: 'POST',
      body: payload,
      immediate: true,
      lazy: true,
      default: () => ({ food: 0, energy: 0, water: 0 }),
      transform: (response: any) => {
        // DEBUG: Log the full response to the console to see the structure
        //console.log(`[${id}] Backend Response:`, response)

        // Attempt to find the metrics in common nesting patterns
        // The backend likely returns the Scenario object, which might have 'results' or 'metrics' nested
        const results = response?.results || response?.metrics || response || {}
        
        return {
           food: (Number(results.food_security_index) || 0) * 100,
           energy: (Number(results.energy_security_index) || 0) * 100,
           water: (Number(results.water_stress_index) || 0) * 100
        }
      }
    })

    // Manual watcher for slider changes
    let timeout: NodeJS.Timeout
    watch(inputs, () => {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        refresh()
      }, 300) 
    }, { deep: true })

    return { data, error, pending }
  }

  return { fetchProjections }
}