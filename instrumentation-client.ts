import { UUID_STORAGE_KEY } from '@/shared/constants'

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
