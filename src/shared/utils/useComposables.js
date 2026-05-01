import { ref, computed } from 'vue';

export function useAsyncState() {
    const isLoading = ref(false);
    const isError = ref(false);
    const error = ref(null);
    const data = ref(null);

    const execute = async (asyncFn) => {
        isLoading.value = true;
        isError.value = false;
        error.value = null;

        try {
            data.value = await asyncFn();
            return data.value;
        } catch (err) {
            isError.value = true;
            error.value = err.message || 'Error desconocido';
            throw err;
        } finally {
            isLoading.value = false;
        }
    };

    const reset = () => {
        isLoading.value = false;
        isError.value = false;
        error.value = null;
        data.value = null;
    };

    return {
        isLoading,
        isError,
        error,
        data,
        execute,
        reset
    };
}


export function useNotifications() {
    const notifications = ref([]);

    const addNotification = (message, type = 'info', duration = 3000) => {
        const id = Date.now();
        const notification = {
            id,
            message,
            type
        };

        notifications.value.push(notification);

        if (duration > 0) {
            setTimeout(() => {
                removeNotification(id);
            }, duration);
        }

        return id;
    };

    const removeNotification = (id) => {
        const index = notifications.value.findIndex(n => n.id === id);
        if (index !== -1) {
            notifications.value.splice(index, 1);
        }
    };

    const success = (message, duration = 3000) => addNotification(message, 'success', duration);
    const error = (message, duration = 5000) => addNotification(message, 'error', duration);
    const warning = (message, duration = 3000) => addNotification(message, 'warning', duration);
    const info = (message, duration = 3000) => addNotification(message, 'info', duration);

    const clear = () => {
        notifications.value = [];
    };

    return {
        notifications,
        addNotification,
        removeNotification,
        success,
        error,
        warning,
        info,
        clear
    };
}


export function useAuth() {
    const currentUser = ref(null);
    const isAuthenticated = computed(() => currentUser.value !== null);

    const login = (user) => {
        currentUser.value = user;
        localStorage.setItem('ps-user', JSON.stringify(user));
    };

    const logout = () => {
        currentUser.value = null;
        localStorage.removeItem('ps-user');
    };

    const initializeAuth = () => {
        const stored = localStorage.getItem('ps-user');
        if (stored) {
            try {
                currentUser.value = JSON.parse(stored);
            } catch {
                logout();
            }
        }
    };

    const updateUser = (updates) => {
        if (currentUser.value) {
            currentUser.value = { ...currentUser.value, ...updates };
            localStorage.setItem('ps-user', JSON.stringify(currentUser.value));
        }
    };

    return {
        currentUser,
        isAuthenticated,
        login,
        logout,
        initializeAuth,
        updateUser
    };
}


export function usePagination(items = [], pageSize = 10) {
    const currentPage = ref(1);

    const totalItems = computed(() => items.length);
    const totalPages = computed(() => Math.ceil(totalItems.value / pageSize));

    const paginatedItems = computed(() => {
        const start = (currentPage.value - 1) * pageSize;
        const end = start + pageSize;
        return items.slice(start, end);
    });

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages.value) {
            currentPage.value = page;
        }
    };

    const nextPage = () => {
        if (currentPage.value < totalPages.value) {
            currentPage.value++;
        }
    };

    const prevPage = () => {
        if (currentPage.value > 1) {
            currentPage.value--;
        }
    };

    const resetPagination = () => {
        currentPage.value = 1;
    };

    return {
        currentPage,
        totalPages,
        paginatedItems,
        goToPage,
        nextPage,
        prevPage,
        resetPagination,
        totalItems
    };
}
