import React from 'react';
import { Button as AntButton, ButtonProps } from 'antd';

const Button: React.FC<ButtonProps> = ({ ...rest }) => {
  return (
    <AntButton shape="round" {...rest}>
      {rest.children}
    </AntButton>
  );
};

export default Button;
