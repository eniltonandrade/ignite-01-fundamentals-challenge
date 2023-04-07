export function buildRoutePath(path) {
    const routeParametersRegex = /:([a-zA-Z]+)/g

    const pathWIthParams = path.replaceAll(routeParametersRegex, '(?<$1>[a-z0-9\-_]+)')

    const pathRegex = new RegExp(`${pathWIthParams}(?<query>\\?(.*))?$`)
  
    return pathRegex;
}