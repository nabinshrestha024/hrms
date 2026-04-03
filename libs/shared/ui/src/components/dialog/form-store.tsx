import type { ReactNode } from 'react';
import type { FieldValues, FormState } from 'react-hook-form';
import { create } from 'zustand';

type ModalSize = 'sm' | 'md' | 'lg';

type InferFormId<T extends string> =
  Lowercase<T> extends `${infer FirstWord} ${infer Rest}`
    ? `${Lowercase<FirstWord>}-${InferFormId<Rest>}`
    : `${Lowercase<T>}-form`;

export interface DialogState {
  open: boolean;
  title: string | null;
  modalTitle: string | null;
  modalSubTitle?: string | null;
  formId: string | undefined;
  okText?: string | ReactNode | null;
  component: React.ReactNode;
  cancelText?: string | ReactNode | null;
  size?: ModalSize;
  onCancel?: () => void;
  formState?: FormState<FieldValues>;
  dialogClassName?: string;
  componentClassName?: string;
}

export interface DialogActions {
  onOpen: <T extends string>(config: {
    title: T;
    modalTitle: string | null;
    modalSubTitle?: string | null;
    okText?: string | ReactNode;
    component: ReactNode;
    cancelText?: string | ReactNode;
    size?: ModalSize;
    formId?: string;
    dialogClassName?: string;
    componentClassName?: string;

    onCancel?: () => void;
  }) => void;
  onClose: () => void;
  setFormState: (state: DialogState['formState']) => void;
}

export const useDialogFormStore = create<DialogState & DialogActions>(
  (set, get) => ({
    open: false,
    title: null,
    formId: '',
    okText: null,
    modalTitle: null,
    component: <></>,
    cancelText: null,
    dialogClassName: '',
    componentClassName: '',

    onCancel: undefined,
    setFormState: (state) => {
      set(() => ({ formState: state }));
      if (state?.isSubmitSuccessful) {
        get().onClose();
      }
    },
    onOpen: <T extends string>(config: {
      title: T;
      modalTitle: string | null;
      modalSubTitle?: string | null;
      okText?: ReactNode;
      component: ReactNode;
      cancelText?: ReactNode;
      size?: ModalSize;
      dialogClassName?: string;
      componentClassName?: string;

      onCancel?: () => void;
    }) => {
      const {
        title,
        okText,
        component,
        cancelText,
        size,
        onCancel,
        modalTitle,
        modalSubTitle,
        dialogClassName,
        componentClassName,
      } = config;
      const formId: InferFormId<T> | string = title
        ? ((title.toLowerCase().replace(/\s+/g, '-') +
            '-form') as InferFormId<T>)
        : '';
      set(() => ({
        open: true,
        title: title,
        modalTitle: modalTitle,
        modalSubTitle: modalSubTitle,
        formId: formId,
        component: component,
        okText: okText,
        cancelText: cancelText,
        size: size,
        dialogClassName: dialogClassName,
        componentClassName: componentClassName,
        onCancel: onCancel,
      }));
    },
    onClose: () => {
      set((state) => ({
        ...state,
        open: false,
      }));
      set((state) => ({
        ...state,
        title: null,
        formId: undefined,
        component: <></>,
        cancelText: null,
        onCancel: undefined,
      }));
    },
  })
);
