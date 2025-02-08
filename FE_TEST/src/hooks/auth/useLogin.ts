import { create } from 'zustand';
import { LoginDto } from '../../types/auth';

// type untuk useregister
export type UseRegister = {
  formData: LoginDto;
  setFormData: (formData: LoginDto) => void;
  resetForm: () => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Tambahkan method handleChange
};

// hooks untuk loginstore
export const useLoginStore = create<UseRegister>((set) => ({
  formData: {
    email: '',
    password: '',
  },
  setFormData: (formData) => set({ formData }),
  resetForm: () => set({
    formData: {
      email: '',
      password: '',
    },
  }),
  // Tambahkan method handleChange
  handleChange: (e) => set((state) => ({
    formData: {
      ...state.formData,
      [e.target.name]: e.target.value
    }
  })),
}));