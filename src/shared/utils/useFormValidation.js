import { ref, computed } from 'vue';

export function useFormValidation() {
    const errors = ref({});
    const touched = ref({});

    const rules = {
        required: (value) => {
            if (!value || (typeof value === 'string' && value.trim() === '')) {
                return 'Este campo es requerido';
            }
            return '';
        },

        email: (value) => {
            if (!value) return '';
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(value) ? '' : 'Email inválido';
        },

        minLength: (min) => (value) => {
            if (!value) return '';
            return value.length >= min ? '' : `Mínimo ${min} caracteres`;
        },

        maxLength: (max) => (value) => {
            if (!value) return '';
            return value.length <= max ? '' : `Máximo ${max} caracteres`;
        },

        phone: (value) => {
            if (!value) return '';
            const phoneRegex = /^[0-9]{7,15}$/;
            return phoneRegex.test(value.replace(/\D/g, '')) ? '' : 'Teléfono inválido';
        },

        number: (value) => {
            return isNaN(value) || value === '' ? 'Debe ser un número' : '';
        },

        url: (value) => {
            if (!value) return '';
            try {
                new URL(value);
                return '';
            } catch {
                return 'URL inválida';
            }
        }
    };

    const validate = (fieldName, value, fieldRules = []) => {
        const fieldErrors = [];

        for (const rule of fieldRules) {
            const error = rule(value);
            if (error) fieldErrors.push(error);
        }

        if (fieldErrors.length > 0) {
            errors.value[fieldName] = fieldErrors[0];
        } else {
            delete errors.value[fieldName];
        }

        return fieldErrors.length === 0;
    };

    const validateAll = (formData, formRules) => {
        const newErrors = {};

        for (const [fieldName, fieldRules] of Object.entries(formRules)) {
            const value = formData[fieldName];
            const fieldErrors = [];

            for (const rule of fieldRules) {
                const error = rule(value);
                if (error) fieldErrors.push(error);
            }

            if (fieldErrors.length > 0) {
                newErrors[fieldName] = fieldErrors[0];
            }
        }

        errors.value = newErrors;
        return Object.keys(newErrors).length === 0;
    };

    const markTouched = (fieldName) => {
        touched.value[fieldName] = true;
    };

    const resetForm = () => {
        errors.value = {};
        touched.value = {};
    };

    const hasErrors = computed(() => Object.keys(errors.value).length > 0);

    return {
        errors,
        touched,
        rules,
        validate,
        validateAll,
        markTouched,
        resetForm,
        hasErrors
    };
}
