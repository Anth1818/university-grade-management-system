'use client';

import { useState } from 'react';
import { actions } from 'astro:actions';
import { Eye, EyeOff } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface ProfileSettingsProps {
  role: 'student' | 'teacher' | 'analyst';
  initialPhone?: string | null;
  initialAddress?: string | null;
}

export function ProfileSettings({ role, initialPhone, initialAddress }: ProfileSettingsProps) {
  const [phone, setPhone] = useState(initialPhone ?? '');
  const [address, setAddress] = useState(initialAddress ?? '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [profileMessage, setProfileMessage] = useState<string | null>(null);
  const [passwordMessage, setPasswordMessage] = useState<string | null>(null);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const passwordChecks = {
    minLength: newPassword.length >= 8,
    upper: /[A-Z]/.test(newPassword),
    lower: /[a-z]/.test(newPassword),
    number: /[0-9]/.test(newPassword),
    symbol: /[^A-Za-z0-9]/.test(newPassword),
    differentFromCurrent: newPassword.length > 0 && currentPassword.length > 0 ? newPassword !== currentPassword : true,
    confirmMatch: confirmPassword.length > 0 ? newPassword === confirmPassword : true,
  };

  const strengthScore = [
    passwordChecks.minLength,
    passwordChecks.upper,
    passwordChecks.lower,
    passwordChecks.number,
    passwordChecks.symbol,
  ].filter(Boolean).length;

  const strengthPercent = (strengthScore / 5) * 100;

  const strengthMeta =
    strengthScore <= 2
      ? { label: 'Debil', color: 'bg-red-500' }
      : strengthScore <= 4
        ? { label: 'Media', color: 'bg-yellow-500' }
        : { label: 'Fuerte', color: 'bg-green-600' };

  const canSubmitPassword =
    passwordChecks.minLength &&
    passwordChecks.upper &&
    passwordChecks.lower &&
    passwordChecks.number &&
    passwordChecks.symbol &&
    passwordChecks.differentFromCurrent &&
    passwordChecks.confirmMatch;

  const handleSaveProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSavingProfile(true);
    setProfileMessage(null);
    setProfileError(null);

    try {
      const { data, error } = await actions.user.updateProfile({
        phone,
        address,
      });

      if (error || !data?.success) {
        throw new Error(error?.message ?? 'No se pudo guardar el perfil.');
      }

      setProfileMessage('Perfil actualizado correctamente.');
      window.setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'No se pudo guardar el perfil.';
      setProfileError(message);
    } finally {
      setSavingProfile(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSavingPassword(true);
    setPasswordMessage(null);
    setPasswordError(null);

    try {
      const { data, error } = await actions.auth.changePassword({
        currentPassword,
        newPassword,
        confirmPassword,
      });

      if (error || !data?.success) {
        throw new Error(error?.message ?? 'No se pudo cambiar la contraseña.');
      }

      setPasswordMessage('Contraseña actualizada correctamente.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'No se pudo cambiar la contraseña.';
      setPasswordError(message);
    } finally {
      setSavingPassword(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Editar perfil</CardTitle>
          <CardDescription>Actualiza tus datos de contacto.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSaveProfile} className="space-y-4">
            {role === 'student' && (
              <>
                <div className="grid gap-2">
                  <Label htmlFor="profile-phone">Teléfono</Label>
                  <Input
                    id="profile-phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Ej: 0412-0000000"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="profile-address">Dirección</Label>
                  <Input
                    id="profile-address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Tu dirección"
                  />
                </div>
              </>
            )}

            {role !== 'student' && (
              <p className="text-sm text-muted-foreground">
                Los datos de contacto editables están disponibles para estudiantes.
              </p>
            )}

            {profileMessage && <p className="text-sm text-green-600">{profileMessage}</p>}
            {profileError && <p className="text-sm text-red-500">{profileError}</p>}

            <Button type="submit" disabled={savingProfile}>
              {savingProfile ? 'Guardando...' : 'Guardar cambios'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Cambiar contraseña</CardTitle>
          <CardDescription>
            Por seguridad, ingresa tu contraseña actual antes de definir una nueva.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="current-password">Contraseña actual</Label>
              <div className="relative">
                <Input
                  id="current-password"
                  type={showCurrentPassword ? 'text' : 'password'}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                  className="pr-10"
                />
                <button
                  type="button"
                  aria-label={showCurrentPassword ? 'Ocultar contraseña actual' : 'Mostrar contraseña actual'}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
                  onClick={() => setShowCurrentPassword((value) => !value)}
                >
                  {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="new-password">Nueva contraseña</Label>
              <div className="relative">
                <Input
                  id="new-password"
                  type={showNewPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  minLength={8}
                  required
                  className="pr-10"
                />
                <button
                  type="button"
                  aria-label={showNewPassword ? 'Ocultar nueva contraseña' : 'Mostrar nueva contraseña'}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
                  onClick={() => setShowNewPassword((value) => !value)}
                >
                  {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm-password">Confirmar nueva contraseña</Label>
              <div className="relative">
                <Input
                  id="confirm-password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  minLength={8}
                  required
                  className="pr-10"
                />
                <button
                  type="button"
                  aria-label={showConfirmPassword ? 'Ocultar confirmación de contraseña' : 'Mostrar confirmación de contraseña'}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
                  onClick={() => setShowConfirmPassword((value) => !value)}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <ul className="text-xs space-y-1 text-muted-foreground">
              <li className={passwordChecks.minLength ? 'text-green-600' : ''}>Minimo 8 caracteres</li>
              <li className={passwordChecks.upper ? 'text-green-600' : ''}>Al menos una letra mayuscula</li>
              <li className={passwordChecks.lower ? 'text-green-600' : ''}>Al menos una letra minuscula</li>
              <li className={passwordChecks.number ? 'text-green-600' : ''}>Al menos un numero</li>
              <li className={passwordChecks.symbol ? 'text-green-600' : ''}>Al menos un simbolo</li>
              <li className={passwordChecks.differentFromCurrent ? 'text-green-600' : ''}>Debe ser diferente de la contraseña actual</li>
              <li className={passwordChecks.confirmMatch ? 'text-green-600' : ''}>La confirmacion debe coincidir</li>
            </ul>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Fortaleza de contraseña</span>
                <span className="font-medium">{strengthMeta.label}</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className={`h-full transition-all ${strengthMeta.color}`}
                  style={{ width: `${strengthPercent}%` }}
                />
              </div>
            </div>

            {passwordMessage && <p className="text-sm text-green-600">{passwordMessage}</p>}
            {passwordError && <p className="text-sm text-red-500">{passwordError}</p>}

            <Button type="submit" disabled={savingPassword || !canSubmitPassword}>
              {savingPassword ? 'Actualizando...' : 'Cambiar contraseña'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
