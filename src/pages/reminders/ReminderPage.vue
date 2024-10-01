<template>
  <div class="p-2">
    <TableWrapper :data="reminders" :query="query" :formatter="reminderFormatter" :method="getReminders"
                  title="Recordatorios Agendados" :key="key">
      <template #addButton>
        <CustomDialog title="Registro de recordatorio">

          <template #button>
            <Button severity="contrast" title="Nuevo recordatorio">
              <Icon icon="ic:round-add-task" class="text-xl "/>
            </Button>
          </template>
          <CreateReminder @reminderCreated="()=>key++"/>
        </CustomDialog>
      </template>
      <template #before>
        <el-table-column width="40">
          <template #default="{row}">
            <ReprogramReminder @reminderReprogrammed="()=>key++" :oldReminder="row"/>
          </template>
        </el-table-column>
      </template>
      <template #after>
        <el-table-column prop="status" label="Status" :width="70" :filter-multiple="false" key="status"
                         column-key="status" :filter-method="() => true"
                         :filters="Object.values(EReminderStatus).map((status: any)=>({
                         text: status,
                         value: status
                         }))">
          <template #default="{row}">
            <div class="flex justify-center">
              <el-dropdown trigger="click" :hide-on-click="false" placement="bottom-end" v-tooltip="row.status">
                <div>
                  <Icon  :icon="statuses[row.status].icon" class="text-xl" :class="statuses[row.status].color"/>
                </div>
                <template #dropdown>
                  <el-dropdown-item v-for="status in Object.values(EReminderStatus).filter((e:any)=>e!==row.status)"
                                    @click="() => {}" :key="status">
                    <el-popconfirm width="300" :title="`¿Desea marcar el recordatorio como ${status}?`"
                                   @confirm="()=>onChangeStatus(row.id, status)" >
                      <template #reference>
                        <div class="flex space-x-1" >
                          <Icon :icon="statuses[status].icon" class="text-xl" :class="statuses[status].color"/>
                          <span :class="statuses[status].color"> {{ status }}</span>
                        </div>
                      </template>
                    </el-popconfirm>

                  </el-dropdown-item>
                </template>
              </el-dropdown>

            </div>
          </template>
        </el-table-column>
        <el-table-column :width="110" fixed="right" label="Acciones">
          <template #default="{ row }">
            <div class="flex justify-end items-center space-x-2 ">
              <template v-if="!row.deletedAt">
                <ReminderDetail :reminder="row"/>
                <EditReminder :key="row.id" :old-reminder="row" @reminderUpdated="()=>key++"/>
                <el-popconfirm width="300" title="¿Desea eliminar este registro?" @confirm="()=>deleteReminder(row.id)">
                  <template #reference>
                    <button class="  !bg-transparent   !border-none" circle title="Eliminar">
                      <Icon icon="carbon:trash-can" class="text-xl text-red-300"/>
                    </button>
                  </template>
                </el-popconfirm>

              </template>
              <el-popconfirm width="300" title="¿Desea restaurar este registro?"
                             v-else>
                <template #reference>
                  <button class="  !bg-transparent   !border-none" circle title="Restaurar">
                    <Icon icon="material-symbols:settings-backup-restore-rounded"
                          class="text-lg"/>
                  </button>
                </template>
              </el-popconfirm>


            </div>
          </template>
        </el-table-column>
      </template>
    </TableWrapper>
  </div>
</template>

<script setup lang="ts">

import {useGetReminder, useSetReminder, useUnsetReminder} from "@/services/reminders";
import {ref} from "vue";
import {EReminderStatus} from "@/interfaces/ModelInterfaces.ts";
import EditReminder from "@/components/reminders/EditReminder.vue";
import CreateReminder from "@/components/reminders/CreateReminder.vue";
import ReminderDetail from "@/components/reminders/ReminderDetail.vue";
import ReprogramReminder from "@/components/reminders/ReprogramReminder.vue";

const {reminders, query, reminderFormatter, getReminders} = useGetReminder();
const {changeStatus} = useSetReminder();
const {key, deleteReminder} = useUnsetReminder();

const onChangeStatus = async (reminderId: string, status: EReminderStatus) => {
  await changeStatus(reminderId, status);
  await getReminders();
}

const statuses = ref({
  [EReminderStatus.pending]: {
    icon: 'ph:clock-bold',
    color: 'text-yellow-600'
  },
  [EReminderStatus.completed]: {
    icon: 'lets-icons:check-fill',
    color: 'text-green-600'
  },
  [EReminderStatus.canceled]: {
    icon: 'uis:times-circle',
    color: 'text-red-600'
  }
})

</script>