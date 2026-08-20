export interface SecurityConfig {
  enabled: boolean;
  pin: string;
  timeoutMinutes: number;
  lastExitTimestamp: number | null;
  lastActivityTimestamp: number;
  isLocked: boolean;
}

const SECURITY_STORAGE_KEY = 'rakeez_erp_security_config_v3';

const DEFAULT_CONFIG: SecurityConfig = {
  enabled: true,
  pin: '1234',
  timeoutMinutes: 3,
  lastExitTimestamp: null,
  lastActivityTimestamp: Date.now(),
  isLocked: false
};

export function getSecurityConfig(): SecurityConfig {
  const data = localStorage.getItem(SECURITY_STORAGE_KEY);
  if (!data) {
    localStorage.setItem(SECURITY_STORAGE_KEY, JSON.stringify(DEFAULT_CONFIG));
    return DEFAULT_CONFIG;
  }
  try {
    const parsed = JSON.parse(data);
    return { ...DEFAULT_CONFIG, ...parsed, timeoutMinutes: 3 };
  } catch (e) {
    return DEFAULT_CONFIG;
  }
}

export function saveSecurityConfig(partial: Partial<SecurityConfig>): SecurityConfig {
  const current = getSecurityConfig();
  const updated = { ...current, ...partial };
  localStorage.setItem(SECURITY_STORAGE_KEY, JSON.stringify(updated));
  return updated;
}

/**
 * تحديث وقت آخر نشاط للمستخدم
 */
export function recordActivity(): void {
  const current = getSecurityConfig();
  if (current.isLocked) return;
  
  const updated = {
    ...current,
    lastActivityTimestamp: Date.now()
  };
  localStorage.setItem(SECURITY_STORAGE_KEY, JSON.stringify(updated));
}

/**
 * تسجيل وقت خروج/مغادرة التطبيق
 */
export function recordExitTime(): void {
  const config = getSecurityConfig();
  if (!config.enabled) return;

  const updatedConfig = {
    ...config,
    lastExitTimestamp: Date.now()
  };
  localStorage.setItem(SECURITY_STORAGE_KEY, JSON.stringify(updatedConfig));
}

/**
 * فحص ما إذا كانت مدة الخمول أو مغادرة الصفحة تجاوزت 3 دقائق
 */
export function checkShouldLock(): boolean {
  const config = getSecurityConfig();
  if (!config.enabled) return false;

  if (config.isLocked) return true;

  const now = Date.now();
  const timeoutMs = (config.timeoutMinutes || 3) * 60 * 1000;

  // 1. فحص زمن مغادرة الصفحة
  if (config.lastExitTimestamp) {
    const elapsedExit = now - config.lastExitTimestamp;
    if (elapsedExit >= timeoutMs) {
      saveSecurityConfig({ isLocked: true });
      return true;
    }
  }

  // 2. فحص زمن الخمول عن الجهاز (Inactivity)
  if (config.lastActivityTimestamp) {
    const elapsedIdle = now - config.lastActivityTimestamp;
    if (elapsedIdle >= timeoutMs) {
      saveSecurityConfig({ isLocked: true });
      return true;
    }
  }

  return false;
}

/**
 * فتح قفل التطبيق باستخدام رمز الدخول
 */
export function unlockApp(enteredPin: string): { success: boolean; message?: string } {
  const config = getSecurityConfig();
  if (!config.enabled) {
    saveSecurityConfig({ isLocked: false, lastExitTimestamp: null, lastActivityTimestamp: Date.now() });
    return { success: true };
  }

  if (enteredPin === config.pin) {
    saveSecurityConfig({ isLocked: false, lastExitTimestamp: null, lastActivityTimestamp: Date.now() });
    return { success: true };
  }

  return { success: false, message: 'رمز الدخول غير صحيح، حاول مرة أخرى' };
}

/**
 * قفل التطبيق فورياً يدويًا
 */
export function lockAppImmediately(): void {
  saveSecurityConfig({ isLocked: true, lastExitTimestamp: Date.now() });
}

/**
 * إعادة ضبط الرمز الافتراضي (1234)
 */
export function resetPinToDefault(): void {
  saveSecurityConfig({ pin: '1234', isLocked: false, lastExitTimestamp: null, lastActivityTimestamp: Date.now() });
}
