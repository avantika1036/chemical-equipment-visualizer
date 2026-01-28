import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'Segoe UI', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Courier New', 'monospace'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        
        // PRIMARY - Deep Ocean Blue (PyQt5 Desktop)
        primary: {
          DEFAULT: "hsl(var(--primary))", // #0A4D8C
          light: "hsl(var(--primary-light))", // #1E7FD8
          dark: "hsl(var(--primary-dark))", // #083A6B
          glow: "hsl(var(--primary-glow))", // #3A9BFF
          foreground: "hsl(var(--primary-foreground))",
        },
        
        // SECONDARY - Tech Green/Teal (PyQt5 Desktop)
        secondary: {
          DEFAULT: "hsl(var(--secondary))", // #00A896
          light: "hsl(var(--secondary-light))", // #02D9BA
          dark: "hsl(var(--secondary-dark))", // #028174
          glow: "hsl(var(--secondary-glow))", // #3DFFEA
          foreground: "hsl(var(--secondary-foreground))",
        },
        
        // ACCENT - Vibrant Amber (PyQt5 Desktop)
        accent: {
          DEFAULT: "hsl(var(--accent))", // #F77F00
          light: "hsl(var(--accent-light))", // #FF9D3A
          dark: "hsl(var(--accent-dark))", // #D66D00
          glow: "hsl(var(--accent-glow))", // #FFB366
          foreground: "hsl(var(--accent-foreground))",
        },
        
        // DESTRUCTIVE/ALERT - Red (PyQt5 Desktop)
        destructive: {
          DEFAULT: "hsl(var(--destructive))", // #EF233C
          light: "hsl(var(--destructive-light))", // #F25C6B
          dark: "hsl(var(--destructive-dark))", // #D90429
          foreground: "hsl(var(--destructive-foreground))",
        },
        
        // SUCCESS - Green (PyQt5 Desktop)
        success: {
          DEFAULT: "hsl(var(--success))", // #00A896
          light: "hsl(var(--success-light))", // #3FD9A8
          foreground: "hsl(var(--success-foreground))",
        },
        
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
        
        info: {
          DEFAULT: "hsl(var(--info))",
          foreground: "hsl(var(--info-foreground))",
        },
        
        // NEUTRAL GRAYS (PyQt5 Desktop)
        neutral: {
          darkest: "hsl(var(--neutral-darkest))", // #1A1D29
          dark: "hsl(var(--neutral-dark))", // #2D3142
          medium: "hsl(var(--neutral-medium))", // #4F5D75
          light: "hsl(var(--neutral-light))", // #BFC0C0
          lightest: "hsl(var(--neutral-lightest))", // #F5F7FA
        },
        
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        
        // SIDEBAR (PyQt5 Desktop Dark Theme)
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        
        // CHART COLORS (PyQt5 Desktop Professional Palette)
        chart: {
          "1": "hsl(var(--chart-1))", // Blue #0A4D8C
          "2": "hsl(var(--chart-2))", // Teal #00A896
          "3": "hsl(var(--chart-3))", // Orange #F77F00
          "4": "hsl(var(--chart-4))", // Purple #6A4C93
          "5": "hsl(var(--chart-5))", // Red #E63946
          "6": "hsl(var(--chart-6))", // Green #2A9D8F
          "7": "hsl(var(--chart-7))", // Yellow #E9C46A
          "8": "hsl(var(--chart-8))", // Dark Blue #264653
        },
      },
      
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-right": {
          from: { opacity: "0", transform: "translateX(20px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "slide-in-left": {
          from: { opacity: "0", transform: "translateX(-20px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.95)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 0 0 hsl(var(--primary) / 0.4)" },
          "50%": { boxShadow: "0 0 0 8px hsl(var(--primary) / 0)" },
        },
        "pulse-glow-secondary": {
          "0%, 100%": { boxShadow: "0 0 0 0 hsl(var(--secondary) / 0.4)" },
          "50%": { boxShadow: "0 0 0 8px hsl(var(--secondary) / 0)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
      },
      
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "slide-in-right": "slide-in-right 0.3s ease-out",
        "slide-in-left": "slide-in-left 0.3s ease-out",
        "scale-in": "scale-in 0.3s ease-out",
        "pulse-glow": "pulse-glow 2s infinite",
        "pulse-glow-secondary": "pulse-glow-secondary 2s infinite",
        "shimmer": "shimmer 2s infinite linear",
      },
      
      boxShadow: {
        "industrial": "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
        "industrial-lg": "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",
        "industrial-xl": "0 20px 50px -12px rgba(0, 0, 0, 0.15)",
        "glow-primary": "0 0 20px hsl(var(--primary) / 0.3)",
        "glow-secondary": "0 0 20px hsl(var(--secondary) / 0.3)",
        "glow-accent": "0 0 20px hsl(var(--accent) / 0.3)",
        "card": "0 10px 30px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)",
        "card-hover": "0 20px 50px rgba(0, 0, 0, 0.15), 0 8px 12px rgba(0, 0, 0, 0.08)",
      },
      
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, hsl(var(--primary-dark)) 0%, hsl(var(--primary)) 50%, hsl(var(--secondary-dark)) 100%)",
        "gradient-header": "linear-gradient(90deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 100%)",
        "gradient-sidebar": "linear-gradient(180deg, hsl(var(--neutral-dark)) 0%, hsl(var(--neutral-darkest)) 100%)",
        "gradient-card": "linear-gradient(180deg, white 0%, hsl(var(--neutral-lightest)) 100%)",
        "gradient-stats": "linear-gradient(180deg, hsl(var(--neutral-darkest)) 0%, hsl(var(--neutral-dark)) 100%)",
      },
      
      letterSpacing: {
        tighter: '-0.05em',
        tight: '-0.025em',
        normal: '0em',
        wide: '0.025em',
        wider: '0.05em',
        widest: '0.1em',
      },
      
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.75rem' }],
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;