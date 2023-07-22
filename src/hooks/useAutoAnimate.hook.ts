import { RefCallback, useCallback, useState } from 'react'
import autoAnimate, {
  AnimationController,
  AutoAnimateOptions,
  AutoAnimationPlugin,
} from 'utils/autoAnimate.util'

/**
 * AutoAnimate hook for adding dead-simple transitions and animations to react.
 * @param options - Auto animate options or a plugin
 * @returns
 */
export function useAutoAnimate<T extends Element>(
  options: Partial<AutoAnimateOptions> | AutoAnimationPlugin = {}
): [RefCallback<T>, (enabled: boolean) => void] {
  const [controller, setController] = useState<
    AnimationController | undefined
  >()

  const element = useCallback((node: T) => {
    if (node instanceof HTMLElement) setController(autoAnimate(node, options))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const setEnabled = (enabled: boolean) => {
    if (!controller) return

    if (enabled) controller.enable()
    else controller.disable()
  }

  return [element, setEnabled]
}
