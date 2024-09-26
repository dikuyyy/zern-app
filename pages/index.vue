<script setup lang="ts">
import {
  Button
} from "~/components/ui/button";
import {
  CardDescription,
  CardHeader,
  Card,
  CardContent,
  CardFooter,
  CardTitle
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import {AreaChart} from '@/components/ui/chart-area'

interface ChartData {
  name: string;
  total: number;
}

const data: ChartData[] = [
  {
    name: 'Jan',
    total: 0
  },
  {
    name: 'Feb',
    total: 0
  },
  {
    name: 'Mar',
    total: 5
  },
  {
    name: 'Apr',
    total: 10
  },
  {
    name: 'Mei',
    total: 12
  },
  {
    name: 'Jun',
    total: 10
  },
  {
    name: 'Jul',
    total: 8
  },
  {
    name: 'Aug',
    total: 3
  },
  {
    name: 'Sept',
    total: 9
  },
  {
    name: 'Oct',
    total: 8
  },
  {
    name: 'Nov',
    total: 16
  },
  {
    name: 'Dec',
    total: 25
  }
]

const tableData = [
  {
    name: 'John Doe',
    roles: 'Admin',
    status: 'Active',
    created_at: '2024-09-01'
  },
  {
    name: 'Jane Smith',
    roles: 'User',
    status: 'Inactive',
    created_at: '2024-08-15'
  },
  {
    name: 'Alice Johnson',
    roles: 'Moderator',
    status: 'Active',
    created_at: '2024-07-30'
  },
  {
    name: 'Bob Brown',
    roles: 'User',
    status: 'Active',
    created_at: '2024-06-22'
  },
  {
    name: 'Charlie Davis',
    roles: 'Admin',
    status: 'Inactive',
    created_at: '2024-05-10'
  },
]

</script>

<template>
  <div>
    <div class="flex items-center justify-between">
      <div class="text-2xl font-bold">Dashboard</div>
      <Button size="sm">Download</Button>
    </div>
    <div class="grid grid-cols-4 gap-4 mt-2">
      <Card>
        <CardHeader>
          <div class="flex justify-between">
            <div class="font-bold">Total Revenue</div>
            <CurrencyIcon/>
          </div>
          <div>
            <div class="text-2xl font-bold">$45,231.89</div>
            <div class="text-xs">+20.1% from last month</div>
          </div>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <div class="flex justify-between">
            <div class="font-bold">Subscription</div>
            <div class="font-bold">$</div>
          </div>
          <div>
            <div class="text-2xl font-bold">+ 2350</div>
            <div class="text-xs">+180.1% from last month</div>
          </div>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <div class="flex justify-between">
            <div class="font-bold">Sales</div>
            <div class="font-bold">$</div>
          </div>
          <div>
            <div class="text-2xl font-bold">+12,234</div>
            <div class="text-xs">+19% from last month</div>
          </div>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <div class="flex justify-between">
            <div class="font-bold">Active Now</div>
            <div class="font-bold">$</div>
          </div>
          <div>
            <div class="text-2xl font-bold">+573</div>
            <div class="text-xs">+201 since last hour</div>
          </div>
        </CardHeader>
      </Card>
    </div>
    <div class="font-bold mt-4">Statistic</div>
    <div class="grid grid-cols-2 gap-4 mt-4">
      <Card class="p-2">
        <AreaChart :data="data" index="name" :categories="['total']" :colors="['red']"/>
      </Card>
      <Card class="p-2">
        <Table>
          <TableCaption>A List of Registered User</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead class="w-[100px]">
                Name
              </TableHead>
              <TableHead>Roles</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>
                Created At
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="(item, index) in tableData" :key="index">
              <TableCell>{{ item.name }}</TableCell>
              <TableCell>{{ item.roles }}</TableCell>
              <TableCell>{{ item.status }}</TableCell>
              <TableCell>{{ item.created_at }}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    </div>
  </div>
</template>