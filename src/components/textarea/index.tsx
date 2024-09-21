import { HTMLProps } from 'react';

import styles from './styles.module.css';

type ITextareaProps = HTMLProps<HTMLTextAreaElement>;

export function Textarea({ ...rest }: ITextareaProps) {
  return <textarea className={styles.textarea} {...rest} />;
}
