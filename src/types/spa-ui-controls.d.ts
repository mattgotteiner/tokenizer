declare module '@mattgotteiner/spa-ui-controls' {
  import type * as React from 'react'

  export type ThemeName = 'light' | 'dark' | 'system'

  export interface AppShellProps {
    children?: React.ReactNode
    header?: React.ReactNode
  }

  export interface TopBarProps {
    subtitle?: React.ReactNode
    title?: React.ReactNode
    trailing?: React.ReactNode
  }

  export interface PanelProps extends React.HTMLAttributes<HTMLElement> {
    as?: keyof React.JSX.IntrinsicElements
    children?: React.ReactNode
  }

  export interface ThemeProviderProps {
    children?: React.ReactNode
    initialTheme?: ThemeName
    persist?: boolean
  }

  export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode
    fullWidth?: boolean
    size?: 'sm' | 'md' | 'lg'
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  }

  export interface BannerProps extends React.HTMLAttributes<HTMLDivElement> {
    actions?: React.ReactNode
    children?: React.ReactNode
    heading?: React.ReactNode
    tone?: 'info' | 'success' | 'warning' | 'danger'
  }

  export interface FormFieldProps {
    children?: React.ReactNode
    hint?: React.ReactNode
    htmlFor?: string
    label: React.ReactNode
  }

  export function AppShell(props: AppShellProps): React.ReactElement
  export function Banner(props: BannerProps): React.ReactElement
  export function Button(props: ButtonProps): React.ReactElement
  export function FormField(props: FormFieldProps): React.ReactElement
  export function Panel(props: PanelProps): React.ReactElement
  export function ThemeProvider(props: ThemeProviderProps): React.ReactElement
  export function TopBar(props: TopBarProps): React.ReactElement
  export function useTheme(): {
    setTheme: (theme: ThemeName) => void
    theme: ThemeName
  }
}

declare module '@mattgotteiner/spa-ui-controls/styles.css'
