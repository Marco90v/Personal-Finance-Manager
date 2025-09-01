import { cn } from "@/lib/utils"
import Preference from "@/components/Preference"
import ChangePassword from "@/components/ChangePassword"
import DangerZone from "@/components/DangerZone"

export type ConfigurationProps = {
  className?: string
}

/**
 * Configuration component for a personal finance app:
 * - Currency selection
 * - Light/Dark theme toggle
 * - Password change
 * - Reset local/testing data (confirm dialog)
 *
 * Style matches clean card-based aesthetic similar to modern dashboards.
 */
export default function Configuration({ className }: ConfigurationProps) {
  
  return (
    <section className={cn("mx-auto w-full max-w-4xl space-y-6 p-2 md:p-4", className)} aria-label="Configuration">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Configuration</h1>
          <p className="text-sm text-muted-foreground">Update preferences and manage your local data.</p>
        </div>
        {/* <Button
          type="button"
          variant="outline"
          className="gap-2 cursor-pointer"
          onClick={() => form.reset(mergedDefaults)}
        >
          <RefreshCw className="h-4 w-4" />
          Reset form
        </Button> */}
      </header>

      {/* Preferences */}
      <Preference />
      {/* Password */}
      <ChangePassword />
      {/* Danger zone */}
      <DangerZone />

    </section>
  )
}
