import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { Alert, Button } from '@aws-amplify/ui-react';
import { useBlocker } from 'react-router-dom';

type Props = {
  isBlocked: boolean;
};

export function CancelGenerateContentPrompt({ isBlocked }: Props) {
  const [open, setOpen] = useState(false);
  const block = useBlocker(isBlocked);
  useEffect(() => {
    if (!isBlocked) {
      return;
    }
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      return '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isBlocked]);

  useEffect(() => {
    if (block.state === 'blocked') {
      setOpen(true);
    }
  }, [block]);

  const onClose = () => setOpen(false);

  const onLeave = () => {
    if (block.state === 'blocked') {
      block.proceed();
    }
  };

  return (
    <Fragment>
      <Transition appear show={open}>
        <Dialog
          as="div"
          className="relative z-50 focus:outline-none"
          onClose={onClose}
        >
          <div className="fixed inset-0 bg-gray-200/55" aria-hidden="true" />
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <TransitionChild
                enter="ease-out duration-300"
                enterFrom="opacity-0 transform-[scale(95%)]"
                enterTo="opacity-100 transform-[scale(100%)]"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 transform-[scale(100%)]"
                leaveTo="opacity-0 transform-[scale(95%)]"
              >
                <DialogPanel className="w-full max-w-lg border border-gray-200 bg-white p-6">
                  <DialogTitle as="h3" className="text-base/7 font-medium">
                    Leave Page
                  </DialogTitle>
                  <p className="mt-2 text-sm/6">
                    <Alert variation="warning">
                      Are you sure that you want to leave the current page? The
                      changes that you made won't be saved.
                    </Alert>
                  </p>
                  <div className="mt-4 flex items-center justify-end gap-3">
                    <Button size="small" onClick={onClose}>
                      Cancel
                    </Button>
                    <Button size="small" variation="primary" onClick={onLeave}>
                      Leave
                    </Button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </Fragment>
  );
}
