// composables/useNexusModel.ts
export const useNexusModel = () => {
  // We no longer need the external API URL here because we are using the internal proxy
  // configured in nuxt.config.ts
  
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

    // FIX: Using '/proxy/api/scenarios/' targets the Nuxt Proxy, avoiding CORS.
    const { data, error, pending, refresh } = await useFetch(`/proxy/api/scenarios/`, {
      key: id,
      method: 'POST',
      body: payload,
      immediate: true,
      lazy: true,
      default: () => ({ food: 0, energy: 0, water: 0 }),
      transform: (response: any) => {
        // console.log(`[${id}] Backend Response:`, response) // Debug log
        const results = response?.results || response?.metrics || response || {}
        return {
           food: (Number(results.food_security_index) || 0) * 100,
           energy: (Number(results.energy_security_index) || 0) * 100,
           water: (Number(results.water_stress_index) || 0) * 100
        }
      }
    })

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