'use client';

import { useState, useEffect } from 'react';
import { Users, ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';

const notifications = [
  { type: 'users', message: 'pessoas estão vendo esta oferta agora!' },
  { type: 'purchase', message: 'acabou de garantir o acesso.', location: 'de São Paulo, SP' },
  { type: 'purchase', message: 'acabou de garantir o acesso.', location: 'do Rio de Janeiro, RJ' },
  { type: 'purchase', message: 'acabou de garantir o acesso.', location: 'de Belo Horizonte, MG' },
  { type: 'purchase', message: 'acabou de garantir o acesso.', location: 'de Curitiba, PR' },
  { type: 'purchase', message: 'acabou de garantir o acesso.', location: 'de Florianópolis, SC' },
  { type: 'purchase', message: 'acabou de garantir o acesso.', location: 'de Brasília, DF' },
  { type: 'purchase', message: 'acabou de garantir o acesso.', location: 'de Salvador, BA' },
];

const firstNames = ["Ana", "Carlos", "Beatriz", "Daniel", "Fernanda", "Gustavo", "Helena", "Igor", "Julia", "Lucas"];

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function SocialProofToast() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentNotification, setCurrentNotification] = useState<React.ReactNode>(null);

  useEffect(() => {
    const showNotification = () => {
      const notificationData = notifications[getRandomInt(0, notifications.length - 1)];
      let content;

      if (notificationData.type === 'users') {
        const userCount = getRandomInt(100, 249);
        content = (
          <>
            <Users className="h-5 w-5 text-primary" />
            <p>
              <span className="font-bold">{userCount}</span> {notificationData.message}
            </p>
          </>
        );
      } else {
        const name = firstNames[getRandomInt(0, firstNames.length - 1)];
        content = (
          <>
            <ShoppingCart className="h-5 w-5 text-green-500" />
            <p>
              <span className="font-bold">{name}</span> {notificationData.location} {notificationData.message}
            </p>
          </>
        );
      }

      setCurrentNotification(content);
      setIsVisible(true);

      setTimeout(() => {
        setIsVisible(false);
      }, 5000); // Hide after 5 seconds
    };

    // Show the first notification after a delay
    const initialTimeout = setTimeout(showNotification, 4000);

    // Then show subsequent notifications at intervals
    const interval = setInterval(showNotification, 38000); // Every 38 seconds

    return () => {
        clearTimeout(initialTimeout);
        clearInterval(interval)
    };
  }, []);

  return (
    <div
      className={cn(
        'fixed top-4 right-4 z-[100] flex items-center gap-3 rounded-lg border bg-card p-4 text-card-foreground shadow-lg transition-transform duration-500',
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-[calc(100%+2rem)] opacity-0'
      )}
    >
      {currentNotification}
    </div>
  );
}
