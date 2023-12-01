import { Pressable, PressableProps } from "react-native";

import { PropsWithChildren, forwardRef } from "react";

const Button = forwardRef((props: PropsWithChildren<PressableProps>, ref) => {
  const { children } = props;
  return <Pressable {...props}>{children}</Pressable>;
});

export default Button;
