<script setup lang="ts">
import { Database, Layers, TrendingUp } from 'lucide-vue-next'
</script>

<template>
  <div id="methodology" class="py-24 scroll-mt-20 bg-slate-100/50 dark:bg-slate-900/50">
    <div class="max-w-4xl mx-auto px-8">
      <div class="text-center mb-16">
        <Badge color="amber">Methodology</Badge>
        <h2 class="text-3xl md:text-4xl font-bold mt-4 mb-4 text-slate-900 dark:text-white">Scientific Nexus Modeling</h2>
        <p class="text-slate-600 dark:text-slate-400 text-lg">
          We utilize a simplified system-dynamics approach to model the cross-sectoral impacts.
        </p>
      </div>

      <div class="relative">
        <div class="absolute left-[28px] top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-700"></div>
        
        <div class="relative pl-12 pb-12 group">
          <div class="absolute left-0 w-14 h-14 bg-white dark:bg-slate-950 border-4 border-indigo-100 dark:border-indigo-900 rounded-full flex items-center justify-center z-10 group-hover:border-indigo-500 transition-colors">
            <Database :size="24" class="text-indigo-600 dark:text-indigo-400" />
          </div>
          <h3 class="text-xl font-bold text-slate-800 ml-6 dark:text-slate-100 mb-2">1. Data Ingestion</h3>
          <p class="text-slate-600 dark:text-slate-400 ml-6">
            We aggregate historical data on crop yields, energy consumption rates, and water table levels. This forms the baseline for our regression models.
          </p>
        </div>

        <div class="relative pl-12 pb-12 group">
          <div class="absolute left-0 w-14 h-14 bg-white dark:bg-slate-950 border-4 border-purple-100 dark:border-purple-900 rounded-full flex items-center justify-center z-10 group-hover:border-purple-500 transition-colors">
            <Layers :size="24" class="text-purple-600 dark:text-purple-400" />
          </div>
          <h3 class="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2 ml-6">2. Interdependency Logic</h3>
          <p class="text-slate-600 dark:text-slate-400 ml-6">
            Our model defines relationships: 
            <br/>• <span class="text-emerald-600 font-medium ml-6">Food</span> production requires Water & Energy.
            <br/>• <span class="text-amber-600 font-medium ml-6">Energy</span> generation consumes Water (cooling).
            <br/>• <span class="text-cyan-600 font-medium ml-6">Water</span> treatment requires Energy.
          </p>
        </div>

        <div class="relative pl-12 group">
           <div class="absolute left-0 w-14 h-14 bg-white dark:bg-slate-950 border-4 border-emerald-100 dark:border-emerald-900 rounded-full flex items-center justify-center z-10 group-hover:border-emerald-500 transition-colors">
            <TrendingUp :size="24" class="text-emerald-600 dark:text-emerald-400" />
          </div>
          <h3 class="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2 ml-6">3. Trade-off Analysis</h3>
          <p class="text-slate-600 dark:text-slate-400 ml-6">
            Linear regression estimates allow us to project how a change in one lever (e.g., +10% Crop Intensity) creates positive or negative feedback loops in other sectors.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>