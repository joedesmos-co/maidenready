import { buildSteps, parts } from "../src/data/parts.js";

const required = ["id", "name", "brand", "price"];
const optional = ["weightG", "sourceUrl", "verificationStatus"];

const report = {
  total: 0,
  realProducts: 0,
  virtualComponents: 0,
  byCategory: {},
  byBuildClass: {},
  verified: 0,
  partiallyVerified: 0,
  unverified: 0,
  deprecated: 0,
  rejected: 0,
  missingFields: [],
  missingOptional: [],
  invalidCompatibility: [],
};

const allParts = [];
for (const step of buildSteps) {
  for (const part of parts[step.key] ?? []) {
    allParts.push({ ...part, _category: step.key });
  }
}

for (const part of allParts) {
  report.total += 1;
  if (part.isVirtual) {
    report.virtualComponents += 1;
  } else {
    report.realProducts += 1;
  }
  report.byCategory[part._category] = (report.byCategory[part._category] ?? 0) + 1;
  for (const buildClass of part.compatibleClasses ?? []) {
    report.byBuildClass[buildClass] = (report.byBuildClass[buildClass] ?? 0) + 1;
  }

  const status = (part.verificationStatus ?? "unverified").toLowerCase();
  if (status === "verified") report.verified += 1;
  else if (status === "partially-verified" || status === "partial") report.partiallyVerified += 1;
  else if (status === "deprecated") report.deprecated += 1;
  else if (status === "rejected") report.rejected += 1;
  else report.unverified += 1;

  for (const field of required) {
    if (part[field] === undefined || part[field] === null || part[field] === "") {
      report.missingFields.push({ id: part.id, category: part._category, field });
    }
  }

  for (const field of optional) {
    if (part[field] === undefined || part[field] === null || part[field] === "") {
      report.missingOptional.push({ id: part.id, category: part._category, field });
    }
  }

  if (!Array.isArray(part.compatibleClasses) || part.compatibleClasses.length === 0) {
    report.invalidCompatibility.push({ id: part.id, category: part._category });
  }
}

console.log(JSON.stringify(report, null, 2));
console.log(`\nCatalog: ${report.total} records`);
console.log(`Real purchasable products: ${report.realProducts}`);
console.log(`Virtual integrated components: ${report.virtualComponents}`);
console.log(`Verified: ${report.verified}, Partial: ${report.partiallyVerified}, Unverified: ${report.unverified}, Deprecated: ${report.deprecated}, Rejected: ${report.rejected}`);
console.log(`Missing required fields: ${report.missingFields.length}`);
console.log(`Missing optional fields: ${report.missingOptional.length}`);
console.log(`Invalid compatibility: ${report.invalidCompatibility.length}`);