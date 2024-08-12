<template>
  <div class="p-5">
    <el-button @click="open">Add User</el-button>
    <el-table :data="data" class="mt-2">
      <el-table-column prop="id" label="ID" />
      <el-table-column prop="name" label="Name" />
      <el-table-column prop="gender" label="Gender" />
      <el-table-column label="Edit">
        <template #default="scope">
          <el-button @click="open(scope.row)" type="primary">Edit</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

  <el-dialog v-model="show" @close="onClosed">
    <el-form ref="formRef" :model="formData" :rules="rule">
      <el-form-item label="Name" prop="name">
        <el-input
          v-model="formData.name"
          placeholder="Need name"
          auto-complete="off"
        />
      </el-form-item>
      <el-form-item label="Gender" prop="gender">
        <el-select v-model="formData.gender" placeholder="Select">
          <el-option label="Male" value="male" />
          <el-option label="Female" value="female" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="onCancel">Cancel</el-button>
        <el-button type="primary" @click="onSubmit">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { apiCall, get_user_list, edit_user, create_user } from "./api/api";

const data = ref([]);
const formData = ref({ name: "", gender: "" });
const show = ref(false);
const formRef = ref(null);
const rule = ref({
  name: [{ required: true, message: "Please input name", trigger: "blur" }],
  gender: [
    { required: true, message: "Please select gender", trigger: "change" },
  ],
});

onMounted(() => {
  query();
});

const query = async () => {
  const { res, err } = await apiCall(get_user_list);
  if (err) {
    return;
  }
  if (res.code == 0) {
    data.value = res.data;
  } else {
    console.log("err", err);
  }
};

const edit = async () => {
  const { res, err } = await apiCall(edit_user, formData.value);
  if (err) {
    return;
  }
  if (res.code == 0) {
    show.value = false;
    query();
  } else {
    console.log("err", err);
  }
};

const add = async () => {
  const { res, err } = await apiCall(create_user, formData.value);
  if (err) {
    return;
  }
  if (res.code == 0) {
    show.value = false;
    query();
  } else {
    console.log("err", err);
  }
};

const open = (data) => {
  console.log("open");
  if (data) {
    formData.value = { ...data };
  }
  show.value = true;
};

const onSubmit = () => {
  console.log("onSubmit");
  formRef.value.validate((valid) => {
    if (valid) {
      if (formData.value.id) {
        edit();
      } else {
        add();
      }
    } else {
      return false;
    }
  });
};

const onCancel = () => {
  console.log("onCancel");
  show.value = false;
};

const onClosed = () => {
  console.log("onClosed");
  clear();
};

const clear = () => {
  console.log("clear");
  formData.value = { name: "", gender: "" };
};
</script>