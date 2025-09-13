import { supabase } from "./client";

// Book a service
export async function bookService(userId: string, serviceType: string, timeSlot: string) {
  // Create booking
  const { data: booking, error: bookingError } = await supabase
    .from('bookings')
    .insert([{ user_id: userId, service_type: serviceType, time_slot: timeSlot }])
    .select()
    .single();

  if (bookingError) {
    console.error('Error creating booking:', bookingError);
    throw bookingError;
  }

  // Send initial confirmation notification to user
  const { error: confirmationError } = await supabase
    .from('notifications')
    .insert([{
      user_id: userId,
      mechanic_id: null,
      booking_id: booking.id,
      message: `Your service request for ${serviceType} has been registered successfully. We are assigning a technician.`,
      type: 'in-app'
    }]);

  if (confirmationError) {
    console.error('Error sending confirmation notification:', confirmationError);
  }

  // Assign mechanic (simple: pick first available)
  const { data: mechanic, error: mechanicError } = await supabase
    .from('mechanics')
    .select('*')
    .eq('status', 'available')
    .limit(1)
    .single();

  if (mechanicError) {
    console.error('Error finding mechanic:', mechanicError);
    // Handle case where no mechanic is available if needed
    return booking;
  }

  if (mechanic) {
    // Update booking with mechanic and status
    const { error: updateBookingError } = await supabase
      .from('bookings')
      .update({ mechanic_id: mechanic.id, status: 'accepted' })
      .eq('id', booking.id);

    if (updateBookingError) {
      console.error('Error updating booking:', updateBookingError);
      throw updateBookingError;
    }

    // Update mechanic status
    const { error: updateMechanicError } = await supabase
      .from('mechanics')
      .update({ status: 'busy' })
      .eq('id', mechanic.id);

    if (updateMechanicError) {
      console.error('Error updating mechanic status:', updateMechanicError);
      // May want to handle this, but for now we'll just log it
    }

    // Send notification to user
    const { error: userNotificationError } = await supabase
      .from('notifications') 
      .insert([{
        user_id: userId,
        mechanic_id: null,
        booking_id: booking.id,
        message: `Your order for ${serviceType} has been accepted by ${mechanic.name}. The mechanic will arrive in your selected time slot: ${timeSlot}.`,
        type: 'in-app'
      }]);

    if (userNotificationError) {
      console.error('Error sending user notification:', userNotificationError);
    }

    // Send notification to mechanic
    const { error: mechanicNotificationError } = await supabase
      .from('notifications')
      .insert([{
        user_id: null,
        mechanic_id: mechanic.id, // Correctly use the mechanic_id field
        booking_id: booking.id,
        message: `You have a new booking for ${serviceType} at ${timeSlot}.`,
        type: 'in-app'
      }]);

    if (mechanicNotificationError) {
      console.error('Error sending mechanic notification:', mechanicNotificationError);
    }
  }

  return booking;
}
