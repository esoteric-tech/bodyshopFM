// This is a singleton module that persists between page navigations
let splineInstance: any = null
let isSplineLoaded = false

export const SplineSingleton = {
  getInstance: () => splineInstance,
  setInstance: (instance: any) => {
    splineInstance = instance
    isSplineLoaded = true
  },
  isLoaded: () => isSplineLoaded
} 