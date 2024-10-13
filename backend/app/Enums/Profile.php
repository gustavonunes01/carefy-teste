<?php

namespace App\Enums;

enum Profile: int
{
    case RECEPTION = 1;
    case PATIENT = 2;
    case DOCTOR = 3;
}
