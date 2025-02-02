import { AnyFunctionMap } from "./typeHelpers"

/** Warning: this is not soundly typed. */
export function createProxy<HandlerObj extends AnyFunctionMap>(
	getFn: <Key extends keyof HandlerObj & string>(
		key: Key,
		...args: Parameters<HandlerObj[Key]>
	) => any,
	setFn?: <Key extends keyof HandlerObj & string>(
		key: Key,
		value: HandlerObj[Key]
	) => any
) {
	return new Proxy(
		{},
		{
			get(target, prop: any) {
				return (...args: any[]) => {
					return (getFn as any)(prop, ...args)
				}
			},
			set(target, prop, value) {
				if (setFn) {
					setFn?.(prop as any, value)
					return true
				} else {
					return false
				}
			},
		}
	) as HandlerObj
}
