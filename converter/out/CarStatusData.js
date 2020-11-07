// packet : CarStatusData


export default function CarStatusData(struct) {
struct
    .uint8('tractionControl')
    .uint8('antiLockBrakes')
    .uint8('fuelMix')
    .uint8('frontBrakeBias')
    .uint8('pitLimiterStatus')
    .float('fuelInTank')
    .float('fuelCapacity')
    .float('fuelRemainingLaps')
    .uint16('maxRPM')
    .uint16('idleRPM')
    .uint8('maxGears')
    .uint8('drsAllowed')
    .uint16('drsActivationDistance')
    .uint8('tyresWear', 4)
    .uint8('actualTyreCompound')
    .uint8('visualTyreCompound')
    .uint8('tyresAgeLaps')
    .uint8('tyresDamage', 4)
    .uint8('frontLeftWingDamage')
    .uint8('frontRightWingDamage')
    .uint8('rearWingDamage')
    .uint8('drsFault')
    .uint8('engineDamage')
    .uint8('gearBoxDamage')
    .int8('vehicleFiaFlags')
    .float('ersStoreEnergy')
    .uint8('ersDeployMode')
    .float('ersHarvestedThisLapMGUK')
    .float('ersHarvestedThisLapMGUH')
    .float('ersDeployedThisLap')
}
