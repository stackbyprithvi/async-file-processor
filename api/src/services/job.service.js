import { findJobByIdRepo } from "../repositories/job.repository.js";

export async function findJobById(id) {
  return await findJobByIdRepo(id);
}
