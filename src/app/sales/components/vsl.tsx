'use client';

export function VSL() {
  return (
    <section className="flex flex-col items-center text-center">
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">Descubra o Segredo para um Cão Calmo</h2>
      <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
        Assista ao vídeo abaixo para entender como nosso método inovador pode transformar o comportamento do seu cachorro em poucos dias.
      </p>
      <div className="mt-8 w-full max-w-4xl mx-auto">
        <div id="ifr_69024ccb8687c6f8d6f2a443_wrapper" style={{ margin: '0 auto', width: '100%', maxWidth: '400px' }}>
          <div style={{ position: 'relative', padding: '177.77777777777777% 0 0 0' }} id="ifr_69024ccb8687c6f8d6f2a443_aspect">
            <iframe
              frameBorder="0"
              allowFullScreen
              src="about:blank"
              id="ifr_69024ccb8687c6f8d6f2a443"
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
              referrerPolicy="origin"
              onLoad={(e) => {
                const target = e.target as HTMLIFrameElement;
                if(target.src === 'about:blank') {
                  target.src = 'https://scripts.converteai.net/9acdea39-985e-40dc-92fd-96bd657faa49/players/69024ccb8687c6f8d6f2a443/v4/embed.html' + (location.search || '?') + '&vl=' + encodeURIComponent(location.href);
                }
              }}
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
