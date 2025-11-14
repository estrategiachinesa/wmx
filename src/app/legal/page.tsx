export default function LegalPage() {
  const lastUpdated = new Date().toLocaleDateString('pt-BR');

  return (
    <div className="prose prose-invert prose-headings:text-primary prose-headings:font-headline max-w-4xl mx-auto bg-card/30 backdrop-blur-sm border border-border/20 p-6 sm:p-10 rounded-xl">
      <h1>Documentos Legais</h1>
      <p className="text-muted-foreground">Última atualização: {lastUpdated}</p>

      <hr className="border-border/50 my-8" />
      
      <h2 id="terms">1. Termos de Uso – Estratégia Chinesa</h2>
      
      <h3>1. Aceitação dos Termos</h3>
      <p>Ao acessar o WebApp “Estratégia Chinesa”, você concorda integralmente com estes Termos de Uso e com a Política de Privacidade. Caso não concorde com algum dos termos, não utilize a plataforma.</p>

      <h3>2. Descrição do Serviço</h3>
      <p>O WebApp “Estratégia Chinesa” é uma ferramenta automatizada que utiliza inteligência artificial para realizar análises de mercado e gerar sinais operacionais em tempo real.</p>
      <p>O sistema oferece três modalidades de acesso:</p>
      <ul>
        <li><strong>DEMO:</strong> 1 sinal gratuito por dia.</li>
        <li><strong>MEMBRO:</strong> Acesso com limites de uso por hora, liberado mediante cadastro em corretora parceira.</li>
        <li><strong>VIP:</strong> Acesso ilimitado, liberado mediante aquisição de licença ou cumprimento de requisitos de afiliação (cadastro e depósito em corretora parceira).</li>
      </ul>

      <h3>3. Natureza do Conteúdo</h3>
      <p>Os sinais, alertas e informações fornecidos pela ferramenta são educacionais e informativos. Eles não representam recomendações de investimento e não garantem resultados financeiros.</p>
      <p>O usuário reconhece que operações em mercados financeiros envolvem riscos, incluindo perdas parciais ou totais do capital investido.</p>

      <h3>4. Responsabilidade do Usuário</h3>
      <p>O usuário é o único responsável por:</p>
      <ul>
        <li>Suas operações e decisões financeiras;</li>
        <li>Manter sigilo das credenciais de acesso;</li>
        <li>Usar o sistema conforme a legislação vigente.</li>
      </ul>
      <p>A Estratégia Chinesa não se responsabiliza por prejuízos, perdas financeiras ou danos decorrentes do uso da plataforma.</p>

      <h3>5. Licenças e Acessos</h3>
        <h4>Acesso DEMO</h4>
        <p>O acesso DEMO é limitado a 1 sinal diário e destinado para teste da plataforma.</p>
        <h4>Acesso MEMBRO</h4>
        <p>O acesso MEMBRO é liberado após o usuário enviar seu ID de uma corretora parceira, cadastrada pelo nosso link de afiliado. Este acesso possui limites de uso por hora.</p>
        <h4>Acesso VIP</h4>
        <p>O acesso VIP (ilimitado) pode ser obtido de duas formas:</p>
        <ol>
            <li>Pela aquisição de uma licença vitalícia.</li>
            <li>Pelo cumprimento dos requisitos de afiliação: cadastro e realização de um depósito mínimo em uma corretora parceira através do nosso link. O ID da conta deve ser enviado para validação.</li>
        </ol>
        <p>A validação do acesso VIP via afiliação é um processo manual que pode levar até 72 horas úteis. O contato para validação é: <strong>estrategiachinesa@gmail.com</strong></p>

      <h3>Regras Adicionais</h3>
      <ul>
        <li>A licença é pessoal e intransferível.</li>
        <li>Compartilhamento de acesso resultará em suspensão imediata da conta.</li>
        <li>Tentativas de burlar o sistema, uso automatizado ou fraude resultarão em banimento sem reembolso.</li>
      </ul>

      <h3>6. Fila de Processamento</h3>
      <p>Para garantir a estabilidade do sistema, usuários dos planos DEMO e MEMBRO podem, ocasionalmente, entrar em uma fila de espera para receber sinais durante períodos de alta demanda. Usuários VIP têm prioridade no processamento.</p>

      <h3>7. Modificações</h3>
      <p>A Estratégia Chinesa pode alterar estes Termos a qualquer momento. É responsabilidade do usuário revisar periodicamente os documentos oficiais.</p>

      <h3>8. Exclusão de Responsabilidade</h3>
      <p>A Estratégia Chinesa não garante:</p>
      <ul>
        <li>Precisão 100% dos sinais;</li>
        <li>Resultados financeiros;</li>
        <li>Disponibilidade contínua do sistema.</li>
      </ul>
      <p>O uso da plataforma é por conta e risco do usuário.</p>

      <h3>9. Contato para Suporte e Questões Legais</h3>
      <p>E-mail: <strong>estrategiachinesa@gmail.com</strong></p>

      <hr className="border-border/50 my-8" />
      
      <h2 id="privacy">2. Política de Privacidade – Estratégia Chinesa</h2>

      <h3>1. Informações Coletadas</h3>
      <p>Coletamos:</p>
      <ul>
        <li>Nome de usuário e e-mail (para criação da conta);</li>
        <li>Dados de navegação (endereço IP, tipo de dispositivo, cookies);</li>
        <li>ID da conta em corretoras parceiras (para validação do acesso VIP via afiliação).</li>
      </ul>

      <h3>2. Uso das Informações</h3>
      <p>Os dados são utilizados para:</p>
      <ul>
        <li>Autenticação e gerenciamento do acesso à conta;</li>
        <li>Personalização e entrega dos sinais;</li>
        <li>Monitoramento de segurança e prevenção de fraudes;</li>
        <li>Liberação dos planos MEMBRO e VIP;</li>
        <li>Comunicação e suporte através do e-mail: <strong>estrategiachinesa@gmail.com</strong>.</li>
      </ul>

      <h3>3. Compartilhamento</h3>
      <p>Os seus dados não são vendidos. Eles podem ser compartilhados apenas com:</p>
      <ul>
        <li>Provedores de infraestrutura (servidores, banco de dados);</li>
        <li>Ferramentas de análise de tráfego;</li>
        <li>Corretoras parceiras, estritamente para validar o ID do usuário que solicita o acesso VIP via afiliação.</li>
      </ul>

      <h3>4. Retenção e Exclusão de Dados</h3>
      <p>Os dados são mantidos enquanto a conta do usuário estiver ativa. Solicitações de exclusão definitiva podem ser feitas através do e-mail: <strong>estrategiachinesa@gmail.com</strong>.</p>
      
      <h3>5. Segurança</h3>
      <p>Embora utilizemos práticas de segurança de mercado (como criptografia e firewalls), nenhum sistema digital é totalmente imune a riscos. Ao utilizar a plataforma, o usuário concorda com essa condição.</p>
      
      <h3>6. Atualizações</h3>
      <p>Esta Política de Privacidade pode ser atualizada a qualquer momento. Recomendamos a revisão periódica.</p>
      
      <hr className="border-border/50 my-8" />

      <h2 id="cookies">3. Política de Cookies – Estratégia Chinesa</h2>
      
      <h3>1. O que são Cookies</h3>
      <p>Cookies são pequenos arquivos de texto que armazenam informações no seu dispositivo (computador ou celular) para melhorar a sua experiência de navegação.</p>
      
      <h3>2. Como Usamos</h3>
      <p>Utilizamos cookies para:</p>
      <ul>
        <li>**Cookies Essenciais:** Manter sua sessão de login ativa, para que você não precise entrar novamente a cada página.</li>
        <li>**Cookies de Preferência:** Lembrar suas escolhas, como o último ativo selecionado.</li>
        <li>**Cookies de Análise:** Entender como os usuários interagem com a plataforma (ex: Google Analytics), nos ajudando a identificar problemas e melhorar o serviço.</li>
      </ul>
      
      <h3>3. Como Gerenciar</h3>
      <p>Você pode desativar ou gerenciar cookies diretamente nas configurações do seu navegador. No entanto, desativar os cookies essenciais pode impedir o funcionamento correto de partes da plataforma, como o sistema de login.</p>
      
      <h3>4. Consentimento</h3>
      <p>Ao continuar utilizando nosso WebApp, você concorda com o uso de cookies conforme descrito nesta política.</p>
    </div>
  );
}
