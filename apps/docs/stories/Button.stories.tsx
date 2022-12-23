import Stack from '@mui/material/Stack';
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps
} from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react';

type ButtonBaseProps = Pick<MuiButtonProps, 'variant' | 'size' | 'color'>;

export interface ButtonProps extends ButtonBaseProps {
  label: string;
}

export const Button = ({ label, ...rest }: ButtonProps) => (
  <MuiButton {...rest}>{label}</MuiButton>
);

type Story = StoryObj<typeof Button>;

Button.defaultProps = {
  variant: 'contained',
  size: 'medium',
  color: 'primary',
  label: 'Label'
};

const meta: Meta<typeof Button> = {
  title: '@myorg／shell/components/Button',
  component: Button
};

export default meta;

const Template = args => <Button {...args} />;

export const Playground: Story = Template.bind({});
Playground.args = {
  label: 'Click me!'
};

export const Demos: Story = () => (
  <Stack spacing={2} maxWidth={300}>
    <Button variant="text" label="Text Button" />
    <Button variant="contained" label="Contained Button" />
    <Button variant="outlined" label="Outlined Button" />
    <Button variant="contained" label="Primary" />
    <Button variant="contained" color="secondary" label="Secondary" />
    <Button variant="contained" color="success" label="Success" />
    <Button variant="contained" color="error" label="Error" />
    <Button variant="contained" size="small" label="Small" />
    <Button variant="contained" size="medium" label="Medium" />
    <Button variant="contained" size="large" label="Large" />
  </Stack>
);
