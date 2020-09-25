const getters = {
    token: state => state.user.userData.token,
    id: state => state.user.userData.id,
    roles: state => state.user.role,
    permission_routes: state => state.permission.routes,
    avatars: state => state.user.userData.avatar,
    name: state => state.user.userData.name
}

export default getters
