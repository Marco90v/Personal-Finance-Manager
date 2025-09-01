import { RefreshCw } from "lucide-react"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Separator } from "./ui/separator"

const DangerZone = () => {

  const handleReset = () => {
    try {
      console.log("handleReset")
      // await onResetData()
      // toast({
      //   title: "Data reset",
      //   description: "Local/testing data has been reset.",
      // })
    } catch (e) {
      console.log(e)
      // toast({
      //   title: "Reset failed",
      //   description: "Could not reset test data. Try again.",
      //   variant: "destructive",
      // })
    }
  }

  return (
    <Card className="border-destructive/20">
      <CardHeader>
        <CardTitle>Danger zone</CardTitle>
        <CardDescription>Reset local/testing data. This action cannot be undone.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border bg-muted/20 p-3 text-sm text-muted-foreground">
          This will clear local app data used for development or testing on this device only.
        </div>
      </CardContent>
      <CardFooter className="justify-end">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button type="button" variant="destructive" className="gap-2 cursor-pointer">
              <RefreshCw className="h-4 w-4" />
              Reset data
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Reset all local/testing data?</AlertDialogTitle>
              <AlertDialogDescription>
                This will remove transactions, accounts, and preferences stored locally. You can’t undo this action.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <Separator />
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleReset}
              >
                Confirm reset
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  )
}

export default DangerZone