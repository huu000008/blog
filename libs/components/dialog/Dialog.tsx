import * as Dialog from "@radix-ui/react-dialog";
import styles from "./Dialog.module.scss";

interface DialogProps {
  title: string;
  description?: string;
  triggerText: string;
  children?: React.ReactNode;
}

export default function CustomDialog({
  title,
  description,
  triggerText,
  children,
}: DialogProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className={styles.triggerButton}>{triggerText}</button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content className={styles.content}>
          <Dialog.Title className={styles.title}>{title}</Dialog.Title>
          {description && (
            <Dialog.Description className={styles.description}>
              {description}
            </Dialog.Description>
          )}

          {children}

          <Dialog.Close asChild>
            <button className={styles.closeButton}>닫기</button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
