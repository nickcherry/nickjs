#!/usr/bin/env bun

import { wizard } from './wizard';

async function create() {
  await wizard();
}

create();
