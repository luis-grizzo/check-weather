import { UUID_STORAGE_KEY } from '@/shared/constants/storage'

/**
 * Obtém o fuso horário do cliente usando Intl.DateTimeFormat().resolvedOptions().
 *
 * Expoe o timezone do cliente para o servidor via cookie, permitindo que
 * o backend adapte horários e formatações locais conforme o identificador IANA
 * retornado (ex.: "America/Sao_Paulo").
 */

const { timeZone } = Intl.DateTimeFormat().resolvedOptions()

document.cookie = `clientTimeZone=${timeZone}; path=/`

/**
 * UUID recuperado do localStorage.
 *
 * Garante que o browser possua um identificador aleatório e persistente para
 * associar aos registros salvos no banco de dados, permitindo localizar e
 * excluir esses dados caso o usuário solicite remoção no futuro.
 */

const UUID = localStorage.getItem(UUID_STORAGE_KEY)

if (!UUID) {
  const newUUID = crypto.randomUUID()

  localStorage.setItem(UUID_STORAGE_KEY, newUUID)
}
