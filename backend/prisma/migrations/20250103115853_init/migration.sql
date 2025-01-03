-- CreateTable
CREATE TABLE "ExperimentResult" (
    "id" SERIAL NOT NULL,
    "prompt" TEXT NOT NULL,
    "modelName" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "response" TEXT NOT NULL,
    "responseTime" DOUBLE PRECISION NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ExperimentResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Metrics" (
    "id" SERIAL NOT NULL,
    "experimentResultId" INTEGER NOT NULL,
    "accuracy" DOUBLE PRECISION,
    "relevancy" DOUBLE PRECISION,
    "toxicity" DOUBLE PRECISION,
    "bias" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Metrics_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Metrics_experimentResultId_key" ON "Metrics"("experimentResultId");

-- AddForeignKey
ALTER TABLE "Metrics" ADD CONSTRAINT "Metrics_experimentResultId_fkey" FOREIGN KEY ("experimentResultId") REFERENCES "ExperimentResult"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
