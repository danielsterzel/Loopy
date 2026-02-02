package com.spotify.model.Device;

import com.CommonUtils;
import com.spotify.model.Device.DTO.DeviceDto;

public final class DeviceMapper {
    public static Device from(DeviceDto dto)
    {
        if(CommonUtils.isNull(dto)) return null;
        return new Device(dto.deviceName());
    }
}
