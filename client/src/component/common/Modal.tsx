"use client";

import { type ReactNode } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { CircleX } from "lucide-react";

interface ModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  children: ReactNode;
  onConfirm?: () => void;
  confirmText?: string;
  confirmClassName?: string;
  cancelText?: string;
  cancelClassName?: string;
}

export default function Modal({
  open,
  setOpen,
  title,
  children,
}: ModalProps) {
  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop className="fixed inset-0 bg-gray-500/75 transition-opacity" />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="w-full flex justify-end p-2">
              <button
                onClick={() => setOpen(false)}
                className={`cursor-pointer `}
              >
                <CircleX className="size-5 text-black" />
              </button>
            </div>

            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <DialogTitle
                as="h3"
                className="text-base font-semibold text-gray-900"
              >
                {title}
              </DialogTitle>
              <div className="mt-2 text-sm text-gray-500">{children}</div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              {/* {onConfirm && (
                <button
                  type="button"
                  onClick={() => {
                    onConfirm();
                    setOpen(false);
                  }}
                  className={`inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-xs sm:ml-3 sm:w-auto ${confirmClassName}`}
                >
                  {confirmText}
                </button>
              )} */}
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
