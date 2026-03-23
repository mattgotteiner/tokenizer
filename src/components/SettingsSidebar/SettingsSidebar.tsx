import { Drawer } from '@mattgotteiner/spa-ui-controls'
import type { AppSettings, EncodingDefinition } from '../../types'
import { SettingsPanel } from '../SettingsPanel/SettingsPanel'

interface SettingsSidebarProps {
  encoding: EncodingDefinition
  isOpen: boolean
  onClose: () => void
  onReset: () => void
  onUpdate: (updates: Partial<AppSettings>) => void
  settings: AppSettings
}

export function SettingsSidebar({
  encoding,
  isOpen,
  onClose,
  onReset,
  onUpdate,
  settings,
}: SettingsSidebarProps): React.ReactElement {
  return (
    <Drawer closeLabel="Close settings" isOpen={isOpen} onClose={onClose} side="right" title="Settings" width={400}>
      <SettingsPanel
        encoding={encoding}
        onReset={onReset}
        onUpdate={onUpdate}
        settings={settings}
      />
    </Drawer>
  )
}
