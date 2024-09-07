"use client";
import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { trpc } from "@/server/client";
import { Skeleton } from "../ui/skeleton";

export default function Stats() {
  const handedIn = trpc.stats.getAllHandedInAssignments.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });

  const notHandedIn = trpc.stats.getAllNotHandedInAssignments.useQuery(
    undefined,
    {
      refetchOnWindowFocus: false,
    },
  );

  if (
    handedIn.isPending ||
    notHandedIn.isPending ||
    !handedIn.data ||
    !notHandedIn.data
  ) {
    return (
      <div className="flex min-h-96 flex-1 flex-col items-center justify-center gap-2 rounded-sm bg-lightBlack">
        <Skeleton className="h-6 w-[70%]" />
        <Skeleton className="h-6 w-[50%]" />
        <Skeleton className="aspect-square w-[35%] rounded-full" />
        <Skeleton className="h-6 w-[20%]" />
        <Skeleton className="h-6 w-[80%]" />
      </div>
    );
  }

  const chartData = [
    { type: "Handed In", amount: handedIn.data.length, fill: "green" },
    { type: "Not Handed In", amount: notHandedIn.data.length, fill: "red" },
  ];

  const chartConfig = {
    assignments: {
      label: "Visitors",
    },
    handedIn: {
      label: "Submitted",
    },
    notHandedIn: {
      label: "Not Submitted",
    },
  } satisfies ChartConfig;

  return (
    <>
      <div className="min-h-96 flex-1 rounded-sm bg-lightBlack">
        <Chart chartConfig={chartConfig} chartData={chartData} />
      </div>
    </>
  );
}

function Chart({
  chartConfig,
  chartData,
}: {
  chartConfig: ChartConfig;
  chartData: {
    type: string;
    amount: number;
    fill: string;
  }[];
}) {
  const totalNumberOfAssignments = chartData[0].amount + chartData[1].amount;

  const percentSubmitted =
    (Math.round((chartData[0].amount / totalNumberOfAssignments) * 1000) /
      1000) *
    100;
  const percentSNotSubmitted =
    (Math.round((chartData[1].amount / totalNumberOfAssignments) * 1000) /
      1000) *
    100;
  return (
    <Card className="flex h-full w-full flex-col bg-lightBlack">
      <CardHeader className="items-center pb-0">
        <CardTitle>Total Assignments</CardTitle>
        <CardDescription>All Time</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="type"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalNumberOfAssignments}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Assignments
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          This is a pie chart of your ratio of Submitted Assignments to Not
          Submitted
        </div>
        <div className="leading-none text-muted-foreground">
          <strong> {percentSubmitted}%</strong> Submitted{" "}
          <strong>{percentSNotSubmitted}%</strong> Not Submitted
        </div>
      </CardFooter>
    </Card>
  );
}
