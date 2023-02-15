import Link from 'next/link';
import { Button } from 'antd';

interface LinkButtonProps {
  href: string;
  children: React.ReactNode;
  type?: 'default' | 'primary' | 'ghost' | 'dashed' | 'link' | 'text';
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

const LinkButton: React.FC<LinkButtonProps> = ({ href, children, ...props }) => {
  return (
    <Link href={href} passHref>
      <Button {...props}>{children}</Button>
    </Link>
  );
};

export default LinkButton;
