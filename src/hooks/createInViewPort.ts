import { createSignal, createEffect, onCleanup } from 'solid-js'

export interface Options {
  rootMargin?: string;
  threshold?: number | number[];
  root?: Element;
}

const createInViewPort = (target: Element, options?: Options) => {
  const [state, setState] = createSignal<boolean>()
  const [ratio, setRatio] = createSignal<number>()

  createEffect(() => {
    if (!target) {
      return
    }
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        setRatio(entry.intersectionRatio)
        setState(entry.isIntersecting)
      }
    }, {
      ...options
    })

    observer.observe(target)

    onCleanup(() => observer.disconnect())
  }, [target])
  return [state, ratio] as const
}

export default createInViewPort