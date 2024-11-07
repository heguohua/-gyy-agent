export function add(routesToAdd: any, router: any) {
    routesToAdd.forEach((route: any) => {
        router.addRoute(route);
    });
}