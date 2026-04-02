import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Button,
  toast,
} from '@erp/ui';
import { cn } from '@erp/utils';
import { Check } from 'lucide-react';
import {
  roleTemplates,
  branchOptions,
  type RoleTemplate,
  type DataScope,
} from './role-templates';

interface AssignAccessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employeeName?: string;
}

export function AssignAccessDialog({
  open,
  onOpenChange,
  employeeName,
}: AssignAccessDialogProps) {
  const [selectedRole, setSelectedRole] = useState<string>('super_admin');
  const [dataScope, setDataScope] = useState<DataScope>('global');
  const [selectedBranches, setSelectedBranches] = useState<string[]>([]);

  const handleToggleBranch = (branch: string) => {
    setSelectedBranches((prev) =>
      prev.includes(branch)
        ? prev.filter((b) => b !== branch)
        : [...prev, branch]
    );
  };

  const handleSave = () => {
    toast({
      title: 'Access template assigned',
      description: `Role: ${
        roleTemplates.find((r) => r.id === selectedRole)?.name
      }, Scope: ${dataScope}`,
      variant: 'success',
    });
    onOpenChange(false);
  };

  const handleClose = () => {
    setSelectedRole('super_admin');
    setDataScope('global');
    setSelectedBranches([]);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg overflow-hidden">
        <DialogHeader>
          <DialogTitle>Assign Access Template</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Step 1: Role Template */}
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Step 1: Assign role template
            </p>
            <div className="grid grid-cols-2 gap-3">
              {roleTemplates.map((role) => (
                <RoleCard
                  key={role.id}
                  role={role}
                  selected={selectedRole === role.id}
                  onClick={() => setSelectedRole(role.id)}
                />
              ))}
            </div>
          </div>

          {/* Step 2: Data Scope */}
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Step 1: Define data scop (branches)
            </p>

            <div className="flex rounded-lg border border-border overflow-hidden">
              {(['global', 'limited', 'self'] as DataScope[]).map((scope) => (
                <button
                  key={scope}
                  type="button"
                  className={cn(
                    'flex-1 py-2 text-sm font-medium capitalize transition-colors',
                    dataScope === scope
                      ? 'bg-white text-primary shadow-sm'
                      : 'bg-muted/50 text-muted-foreground hover:text-foreground'
                  )}
                  onClick={() => setDataScope(scope)}
                >
                  {scope === 'global'
                    ? 'Global'
                    : scope === 'limited'
                    ? 'Limited'
                    : 'Self'}
                </button>
              ))}
            </div>

            {/* Branch selector — only visible for "Limited" scope */}
            {dataScope === 'limited' && (
              <div className="grid grid-cols-2 gap-2">
                {branchOptions.map((branch) => {
                  const isSelected = selectedBranches.includes(branch);
                  return (
                    <button
                      key={branch}
                      type="button"
                      className={cn(
                        'flex items-center justify-between rounded-md border px-3 py-2 text-sm transition-colors text-left',
                        isSelected
                          ? 'border-primary bg-primary/5 text-foreground'
                          : 'border-border text-muted-foreground hover:border-foreground/30'
                      )}
                      onClick={() => handleToggleBranch(branch)}
                    >
                      {branch}
                      {isSelected && <Check className="size-4 text-primary" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ── Role Card ───────────────────────────────────────────────────────

function RoleCard({
  role,
  selected,
  onClick,
}: {
  role: RoleTemplate;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className={cn(
        'relative flex flex-col items-start rounded-lg border p-3 text-left transition-colors',
        selected
          ? 'border-primary bg-primary/5'
          : 'border-border hover:border-foreground/30'
      )}
      onClick={onClick}
    >
      <span className="text-sm font-medium text-foreground">{role.name}</span>
      <span className="text-xs text-muted-foreground">{role.description}</span>
      {selected && (
        <Check className="absolute right-2.5 top-2.5 size-4 text-primary" />
      )}
    </button>
  );
}
