// src/theme/colors.ts

export const theme = {
  colors: {
    // Cores Base
    background: '#FAFAFA',       // Fundo geral (oklch 0.98...)
    foreground: '#1F2937',       // Texto principal (cinza escuro)
    
    // Cards e Superfícies
    card: '#FFFFFF',             // Fundo dos cards
    cardForeground: '#1F2937',   // Texto dentro dos cards
    
    // Cores Principais
    primary: '#111827',          // Botões principais (quase preto)
    primaryForeground: '#FFFFFF', // Texto no botão principal
    
    // Destaque (Accent - Roxo/Azul do seu design)
    accent: '#8B5CF6',           // Cor de destaque (Violeta)
    accentForeground: '#FFFFFF', // Texto no destaque
    
    // Tons Mudos (Cinzas claros)
    muted: '#F3F4F6',            // Fundos secundários
    mutedForeground: '#6B7280',  // Textos secundários (cinza médio)
    
    // Bordas e Inputs
    border: '#E5E7EB',           // Linhas divisórias
    input: '#F9FAFB',            // Fundo de inputs
    
    // Estados
    destructive: '#EF4444',      // Vermelho (Erro/Sair)
    success: '#22C55E',          // Verde (Online)
    ring: '#8B5CF6',             // Cor do foco
  }
};