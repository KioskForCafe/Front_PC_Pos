import React from 'react';
import MenuItem, { MenuItemProps } from '@mui/material/MenuItem';

interface CustomMenuItemProps extends MenuItemProps {
  customValue: string; // 커스텀 속성으로 전달할 값의 타입 정의
}

const CustomMenuItem: React.FC<CustomMenuItemProps> = ({ customValue, ...rest }) => {
  return <MenuItem {...rest} custom-value={customValue} />;
};

export default CustomMenuItem;