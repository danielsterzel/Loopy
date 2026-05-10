package com.domain.model.Device;

import com.spotify.model.Device.DTO.DeviceDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public final class DeviceMapper {

    private static final Logger log = LoggerFactory.getLogger(DeviceMapper.class);
    public static Device from(DeviceDto dto)
    {
        if(dto == null )
        {
            log.warn("Device DTO is null");
            return null;
        }
        return new Device(dto.deviceName());
    }
}
