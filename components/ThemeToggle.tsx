'use client';

import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/lib/hooks/useTheme';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const ToggleButton = styled(Button)`
  position: fixed;
  bottom: 2rem;
  left: 2rem;
  z-index: 50;
  border-radius: 9999px;
  padding: 0.75rem;
  background: ${props => props.theme.cardBackground};
  color: ${props => props.theme.textPrimary};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background: ${props => props.theme.muted};
  }
`;

const ThemeToggle = () => {
  const { mode, toggle } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <ToggleButton
      as={motion.button}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggle}
      size="icon"
    >
      {mode === 'light' ? <Moon size={20} /> : <Sun size={20} />}
    </ToggleButton>
  );
};

export default ThemeToggle;